const baseMockData = [
  {
    feeling: "veryBad",
    emotion: ["stressed", "overwhelmed"],
    reason: ["work", "news"],
    extraNotes: "Felt really stressed due to workload. News wasn't helpful.",
  },
  {
    feeling: "neutral",
    emotion: ["neutral", "thoughtful"],
    reason: ["family", "nature"],
    extraNotes:
      "A typical day, had some reflective moments while spending time with family.",
  },
  {
    feeling: "neutral",
    emotion: ["neutral", "focused"],
    reason: ["work", "fitness"],
    extraNotes: "Stayed focused on work and fitness goals.",
  },
  {
    feeling: "good",
    emotion: ["content", "relaxed"],
    reason: ["hobbies", "reading"],
    extraNotes: "A good day with hobbies and relaxing reading time.",
  },
  {
    feeling: "neutral",
    emotion: ["neutral", "insightful"],
    reason: ["work", "journaling"],
    extraNotes: "Spent time journaling, which brought some insights.",
  },
  {
    feeling: "bad",
    emotion: ["tired", "sad"],
    reason: ["work", "health"],
    extraNotes: "Felt tired and sad, possibly due to health issues.",
  },
  {
    feeling: "neutral",
    emotion: ["neutral", "reflective"],
    reason: ["journaling", "nature"],
    extraNotes: "A day of reflection and time spent in nature.",
  },
  {
    feeling: "neutral",
    emotion: ["neutral", "focused"],
    reason: ["work", "education"],
    extraNotes: "Focused on work and educational reason.",
  },
  {
    feeling: "good",
    emotion: ["happy", "content"],
    reason: ["meditation", "reading", "walking"],
    extraNotes: "Had a productive day, felt positive throughout.",
  },
  {
    feeling: "bad",
    emotion: ["angry", "tired"],
    reason: ["work", "family"],
    extraNotes: "Felt angry and tired, possibly due to family issues.",
  },
  {
    feeling: "bad",
    emotion: ["sad", "overwhelmed"],
    reason: ["work", "organizing"],
    extraNotes: "Felt overwhelmed by too many tasks.",
  },
  {
    feeling: "veryBad",
    emotion: ["stressed", "anxious"],
    reason: ["work", "health"],
    extraNotes: "High anxiety and stress from work and health concerns.",
  },
  {
    feeling: "veryGood",
    emotion: ["cheerful", "optimistic"],
    reason: ["celebration", "dancing"],
    extraNotes: "Joyful day spent celebrating with friends.",
  },
  {
    feeling: "good",
    emotion: ["happy", "content"],
    reason: ["meditation", "cooking"],
    extraNotes: "Good day with positive emotion.",
  },
  {
    feeling: "veryBad",
    emotion: ["stressed", "frustrated"],
    reason: ["work", "news"],
    extraNotes: "Very stressful and frustrating day due to work and news.",
  },
  {
    feeling: "veryBad",
    emotion: ["anxious", "overwhelmed"],
    reason: ["work", "health"],
    extraNotes: "Anxiety and overwhelming workload.",
  },
  {
    feeling: "bad",
    emotion: ["sad", "guilty"],
    reason: ["work", "cleaning"],
    extraNotes: "Felt sad and guilty over unfinished tasks.",
  },
  {
    feeling: "neutral",
    emotion: ["neutral", "reflective"],
    reason: ["journaling", "light exercise"],
    extraNotes: "A day for self-reflection, felt calm and collected.",
  },
  {
    feeling: "veryBad",
    emotion: ["anxious", "lonely"],
    reason: ["work", "spirituality"],
    extraNotes: "Very anxious and felt lonely, spent time on spiritual reason.",
  },
  {
    feeling: "bad",
    emotion: ["sad", "overwhelmed"],
    reason: ["cleaning", "organizing"],
    extraNotes:
      "Felt stressed due to too many things to do. Need to plan better.",
  },
  {
    feeling: "veryGood",
    emotion: ["happy", "proud"],
    reason: ["work", "family"],
    extraNotes:
      "Felt very proud of work achievements and had good family time.",
  },
  {
    feeling: "good",
    emotion: ["happy", "content", "optimistic"],
    reason: ["meditation", "reading", "walking"],
    extraNotes: "Had a productive day, felt positive throughout.",
  },
  {
    feeling: "veryBad",
    emotion: ["stressed", "frustrated"],
    reason: ["work", "news"],
    extraNotes: "High stress and frustration from work and news.",
  },
  {
    feeling: "bad",
    emotion: ["angry", "tired"],
    reason: ["work", "health"],
    extraNotes: "Felt angry and tired, likely due to health issues.",
  },
  {
    feeling: "good",
    emotion: ["energised", "excited", "insightful", "energised"],
    reason: ["colleagues", "weather", "hobbies"],
    extraNotes: "Felt angry and tired, likely due to health issues.",
  },
];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const filledMockData = (() => {
  const len = baseMockData.length;
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - (len - 1));
  return baseMockData.map((item, idx) => {
    const d = new Date(start);
    d.setDate(start.getDate() + idx);
    return {
      ...item,
      date: formatDate(d),
    };
  });
})();

export default filledMockData;
