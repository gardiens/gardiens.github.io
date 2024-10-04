import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CareerDirectory = path.join(process.cwd(), 'public/career');

export default function getSortedCareerData() {

    const fileNames = fs.readdirSync(CareerDirectory);
    fileNames.filter((fileName) => { return fileName.endsWith('.md') });

    const allCareerData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(CareerDirectory, fileName);
        if (!fs.existsSync(fullPath)) {
            return {};
        }
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        let abstract = "";
        let content = matterResult.content;
        // if "## Abstract" is in the content, split the content into abstract and content
        let abstract_word = "## Abstract";
        let abstract_word_possibilities = ["## Abstract", "## abstract", "# Abstract", "# abstract", "### Abstract", "### abstract", "#### Abstract", "#### abstract", "##### Abstract", "##### abstract", "###### Abstract", "###### abstract"];
        for (let i = 0; i < abstract_word_possibilities.length; i++) {
        if (content.includes(abstract_word_possibilities[i])) {
            abstract_word = abstract_word_possibilities[i];
            break;
        }
        }
        if (content.includes(abstract_word)) {
            const splitContent = content.split(abstract_word);
            // find first \n
            let i = 0;
            // check end of document
            while (i < splitContent[1].length && splitContent[1][i] !== "\n") {
            i++;
            }
            i++;

            // find first #
            let j = i;
            while (j < splitContent[1].length && splitContent[1][j] !== "#") {
            j++;
            }
            content = splitContent[1].substring(j);
            // erase last spaces and new lines
            while (splitContent[1][j] === " " || splitContent[1][j] === "\n" || splitContent[1][j] === "\r" || splitContent[1][j] === "\t") {
            j--;
            }
            abstract = splitContent[1].substring(i, j);
        }

        return {
            id,
            ...matterResult.data,
            abstract,
        };
    })
    // filter out empty objects
    .filter(obj => Object.keys(obj).length !== 0);

    allCareerData.sort((a, b) => {
    // split on -
    const aDate = a.period.toString().split('-');
    const bDate = b.period.toString().split('-');
    if (aDate.length === 1) {
      aDate.push(aDate[0]);
    }
    if (bDate.length === 1) {
      bDate.push(bDate[0]);
    }
    // compare ending years
    if (aDate[1] < bDate[1]) {
      return 1;
    } else if (aDate[1] > bDate[1]) {
      return -1;
    }
    // compare starting years
    if (aDate[0] < bDate[0]) {
      return 1;
    } else if (aDate[0] >= bDate[0]) {
      return -1;
    }
  });
  // add key for ordering
  for (let i = 0; i < allCareerData.length; i++) {
    allCareerData[i].key = i;
  }
  return allCareerData;
}
