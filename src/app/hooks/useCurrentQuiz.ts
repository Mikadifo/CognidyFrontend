//TODO: handle session is not working as expected

//import { useEffect, useState } from "react";
//import { LocalStorageKeys } from "../constants";
//import QuizzesDto from "../dtos/QuizzesDto";

//const { CURRENT_QUIZ } = LocalStorageKeys;

//export function useCurrentQuiz() {
//const [quizzesSession, setQuizzesSession] = useState<string[]>([]);
//const [currentQuiz, setCurrentQuiz] = useState<number>(0);
//const [quizzesCompleted, setQuizzesCompleted] = useState(false);
//const [missedCount, setMissedCount] = useState<number>(0);
//const [correctCount, setCorrectCount] = useState<number>(0);

//const [mounted, setMounted] = useState<boolean>(false);

//useEffect(() => {
//const session = sessionStorage.getItem(CURRENT_QUIZ);

//if (session) {
//const parsed = JSON.parse(session);
//console.log("session: ", parsed);

//setQuizzesSession(parsed.quizzesSession || []);
//setCurrentQuiz(parsed.currentQuiz || 0);
//setQuizzesCompleted(parsed.quizzesCompleted || false);
//setMissedCount(parsed.missedCount || 0);
//setCorrectCount(parsed.correctCount || 0);
//}

//setMounted(true);
//}, []);

//useEffect(() => {
//if (mounted) {
//console.log("setting: ", currentQuiz);
//sessionStorage.setItem(
//CURRENT_QUIZ,
//JSON.stringify({
//quizzesSession,
//currentQuiz,
//quizzesCompleted,
//missedCount,
//correctCount,
//}),
//);
//}
//}, [
//currentQuiz,
//quizzesCompleted,
//missedCount,
//correctCount,
//quizzesSession,
//]);

//const initQuizzesSession = (quizzes: QuizzesDto[]) => {
//if (quizzesSession.length === 0 && quizzes.length > 0) {
//const shuffled = [...quizzes].sort(() => Math.random() - 0.5);

//setQuizzesSession(shuffled.map((q) => q._id));
//setQuizzesCompleted(false);
//setCurrentQuiz(0);
//setMissedCount(0);
//setCorrectCount(0);

//return;
//}

//if (quizzesSession.length > 0) {
//const existingIds = new Set(quizzesSession);
//const newQuizzesIds = quizzes
//.filter((q) => !existingIds.has(q._id))
//.map((q) => q._id);

//if (newQuizzesIds.length > 0) {
//setQuizzesSession((prev) => [...prev, ...newQuizzesIds]);
//}
//}
//};

//const clearQuizzesSession = () => {
//setQuizzesSession([]);
//setQuizzesCompleted(false);
//setCurrentQuiz(0);
//setMissedCount(0);
//setCorrectCount(0);

//sessionStorage.removeItem(CURRENT_QUIZ);
//};

//return {
//quizzesSession,
//initQuizzesSession,
//clearQuizzesSession,
//currentQuiz,
//setCurrentQuiz,
//quizzesCompleted,
//setQuizzesCompleted,
//missedCount,
//setMissedCount,
//correctCount,
//setCorrectCount,
//};
//}
