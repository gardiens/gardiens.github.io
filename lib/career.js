import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CareerDirectory = path.join(process.cwd(), 'public/career');

export default function getSortedCareerData() {
    // Only keep .md files
    const mdFileNames = fs.readdirSync(CareerDirectory).filter(fileName => fileName.endsWith('.md'));

    const allCareerData = mdFileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(CareerDirectory, fileName);

        if (!fs.existsSync(fullPath)) return {};

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        let abstract = "";
        let content = matterResult.content;

        // Identify abstract section
        const abstractHeadings = [
            "## Abstract", "## abstract", "# Abstract", "# abstract",
            "### Abstract", "### abstract", "#### Abstract", "#### abstract",
            "##### Abstract", "##### abstract", "###### Abstract", "###### abstract"
        ];

        let abstractHeading = abstractHeadings.find(h => content.includes(h));

        if (abstractHeading) {
            const splitContent = content.split(abstractHeading);
            let i = 0;

            // Move to start of abstract text
            while (i < splitContent[1].length && splitContent[1][i] !== "\n") i++;
            i++;

            // Find the start of the next section (starting with #)
            let j = i;
            while (j < splitContent[1].length && splitContent[1][j] !== "#") j++;

            // Trim whitespace
            while (splitContent[1][j] === " " || splitContent[1][j] === "\n" || splitContent[1][j] === "\r" || splitContent[1][j] === "\t") j--;

            abstract = splitContent[1].substring(i, j).trim();
            content = splitContent[1].substring(j);
        }

        return {
            id,
            ...matterResult.data,
            abstract,
        };
    })
    .filter(obj => Object.keys(obj).length !== 0); // Remove empty results

    // Sort career entries by end date (descending)
    allCareerData.sort((a, b) => {
        const aDate = a.period.toString().split('-');
        const bDate = b.period.toString().split('-');
        if (aDate.length === 1) aDate.push(aDate[0]);
        if (bDate.length === 1) bDate.push(bDate[0]);

        if (aDate[1] < bDate[1]) return 1;
        if (aDate[1] > bDate[1]) return -1;
        if (aDate[0] < bDate[0]) return 1;
        return -1;
    });

    // Add numeric key for rendering
    allCareerData.forEach((item, index) => {
        item.key = index;
    });

    return allCareerData;
}