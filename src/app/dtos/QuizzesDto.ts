export default interface QuizzesDto {
  _id: string;
  question: string;
  options: string[];
  correct: string;
  sourceFileName: string;
}
