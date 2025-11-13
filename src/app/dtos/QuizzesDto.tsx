export default interface QuizzesDto {
  _id: string;
  question: string;
  options: string[];
  correct: number;
  sourceFileName: string;
}
