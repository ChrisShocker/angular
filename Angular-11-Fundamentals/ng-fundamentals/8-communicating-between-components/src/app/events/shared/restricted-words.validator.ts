import { FormControl } from "@angular/forms";

//custom validator function
export function restrictedWords(words: any) {
  return (control: FormControl): { [key: string]: any } | null => {
    //pass validation of no words
    if (!words) return null;

    var invalidWords = words
      //go through all words and check to see if restricted words exist
      .map((wordData: any) =>
        control.value.includes(wordData) ? wordData : null
      )
      //filter out words that weren't null
      .filter((restrictedWords: any) => restrictedWords != null);

    return invalidWords && invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ') }
      : null;
  };
}
