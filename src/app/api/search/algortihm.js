// Database
import pool from '../../../lib/db';

import natural from 'natural';

const TfIdf = natural.TfIdf;

function extractKeywords(text, maxKeywords = 5) {
    const tfidf = new TfIdf();
          tfidf.addDocument(text);
    const keywords = tfidf.listTerms(0)
        .slice(0, maxKeywords)
        .map(item => item.term);
    return keywords;
}

function readabilityIndex(text) {
    const sentences = text.split(/[.!?]/).filter(Boolean).length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const avgWordsPerSentence = words / sentences;
  
    return avgWordsPerSentence;
}

function vocabularyDiversity(text) {
    const words = text.split(/\s+/).map(word => word.toLowerCase());
    const uniqueWords = new Set(words);
    return uniqueWords.size / words.length;
}

function repetitionScore(text) {
    const words = text.split(/\s+/).map(word => word.toLowerCase().replace(/[^\w\s]/g, ''));
    const wordCount = words.length;
    const wordFrequency = {};
  
    words.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  
    const uniqueWordsCount = Object.keys(wordFrequency).length;
    const diversityScore = uniqueWordsCount / wordCount;
  
    let repetitionPenalty = 0;
    for (const word in wordFrequency) {
        if (wordFrequency[word] > 3) {
            repetitionPenalty += wordFrequency[word] - 3;
        }
    }
  
    const finalScore = Math.max(0, diversityScore - repetitionPenalty * 0.05);
    return finalScore;
}

async function estimatePageScore(page) {
    let score = 0;

    // Response time
    if (page.response_time <= 500) { // -- When response time is < or = to 500ms
        score += 15; // -- Add 15 points
    }else if (page.response_time <= 1000) {
        score += 10; // -- Add 10 points
    }else if (page.response_time <= 2000) {
        score += 5; // ...
    }else if (page.response_time > 5000) {
        score -= 10;
    }

    // Name (length)
    if(page.name.length > 50 && page.name.length <= 60){
        score += 10
    }else if(page.name.length > 40 && page.name.length <= 50){
        score += 5
    }else if(page.name.length === 0 || page.name === ""){
        score -= 20
    }
    // Name (content) // Verify if title contains keywords presents in page content
    const keywords_title = extractKeywords(page.name, 10);
    const keywords_text = page.text.flatMap(text => extractKeywords(text));

    const titleContainsKeywords = keywords_title.some(keyword => keywords_text.includes(keyword)); // Verify in text
    if (titleContainsKeywords) {
        score += 20;
    }

    // Description (length)
    if(page.description.length > 70 && page.description.length <= 120){
        score += 10
    }else if(page.description.length === 0 || page.description === ""){
        score -= 20
    }

    // Description (content)
    const keywords_description = extractKeywords(page.description, 10);
    
    const descriptionContainsKeywords = keywords_description.some(keyword => keywords_text.includes(keyword)); // Verify in text
    const titleContainsEquivalentKeywords = keywords_title.some(keyword => keywords_description.includes(keyword)); // Verify in title
    if (descriptionContainsKeywords && titleContainsEquivalentKeywords) {
        score += 10;
    }

    // Canonical
    if(page.canonical === page.url){
        score += 5;
    }

    // Content quality (length)
    const compressedText = page.text.join(' ');

    if (compressedText.length > 1000 && compressedText.length <= 2000) {
        score += 5;
    } else if (compressedText.length > 2000) {
        score += 10;
    } else if (compressedText.length === 0 || compressedText === "") {
        score -= 20;
    }
    
    // Content quality (score)
    let totalRepetitionScore = 0;
    let totalReadabilityScore = 0;

    page.text.forEach(text => {
        const repetition = repetitionScore(text).toFixed(2); // Words repetition
        const readability = readabilityIndex(text); // Text readability

        if(repetition >= 0.75){
            totalRepetitionScore += 20;
        }else if(repetition >= 0.5 && repetition < 0.75){
            totalRepetitionScore += 10;
        }else if(repetition >= 0.25 && repetition < 0.5){
            totalRepetitionScore += 5;
        }else{
            totalRepetitionScore -= 10;
        }

        if(readability <= 20){
            totalReadabilityScore += 20;
        }else if(readability > 20 && readability <= 30){
            totalReadabilityScore += 10;
        }else if(readability > 30 && readability <= 40){
            totalReadabilityScore += 5;
        }else{
            totalReadabilityScore -= 10;
        }
    });

    score += totalRepetitionScore / page.text.length;
    score += totalReadabilityScore / page.text.length;

    return score;
}

const pageRank = async (pages) => {
    const scoredPages = await Promise.all(
        pages.map(async (page) => {
            const score = await estimatePageScore(page);
            return { ...page, score };
        })
    );

    return scoredPages.sort((a, b) => b.score - a.score);
};


// SQL
// -- Get data
const getData = (search, callback) => {    
    pool.query(`SELECT * FROM scraped_data WHERE (name LIKE '%$1%') OR (description LIKE '%$1%') OR (text::text LIKE '%$1%') LIMIT 100`, [search], (err, rows) => {
        if(err) throw err;
        return callback(rows)
    })
}

export {
    pageRank,
    getData,
}