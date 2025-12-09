export const feedback = `
{{conversation}}

Based on the above interview conversation between the assistant and the user,
give feedback for the user's interview. Provide ratings out of 10 for:

- Technical Skills
- Communication
- Problem Solving
- Experience

Also give a summary in 3 sentences about the interview, 
and write one line stating whether the candidate is recommended for hire.

Return the response strictly in this JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 0,
      "communication": 0,
      "problemSolving": 0,
      "experience": 0
    },
    "summary": "",
    "recommendation": "",
    "recommendationMsg": ""
  }
}
`;
