import nlp from "compromise";

function extractKeywords(text: string): string[] {
    let doc = nlp(text);
    let keywords = doc.nouns().out("array"); // Extract nouns
    return [...new Set(keywords)]; // Remove duplicates
}

// Example usage
const text = `Quantum communication leverages the principles of quantum mechanics to securely transmit information. 
Techniques like quantum key distribution (QKD) use entanglement and superposition to ensure cryptographic security. 
The development of quantum networks and the quantum internet aims to create ultra-secure global communication.`;

console.log(extractKeywords(text));


export default extractKeywords