import { XMLParser } from "fast-xml-parser";

export const toJSON = (XMLdata: string) => {
  const parser = new XMLParser();
  let jObj = parser.parse(XMLdata);

  const musicData = jObj;

  const allNotes: any[] = [];

  const measures = musicData["score-partwise"]["part"]["measure"];

  // console.log(measures);
  measures.forEach((measure: any) => {
    if (measure.note) {
      // If there are notes in the measure, push them to the allNotes array
      let measureArr: any[] = [];
      measure.note.forEach((note: any) => {
        if (note.pitch) {
          measureArr.push({
            note: note.pitch.step.toLowerCase() + note.pitch.octave,
            type: note.type,
          });
        }
      });

      allNotes.push(measureArr);
    }
  });

  return allNotes;
};
