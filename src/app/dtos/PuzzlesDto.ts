export default interface PuzzlesDto {
  _id: string;
  pairs: {
    left: string;
    right: string;
  }[];
  sourceFileName: string;
}
