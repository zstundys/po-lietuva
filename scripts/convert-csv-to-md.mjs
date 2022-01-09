import { parse } from "csv-parse/sync";
import fs from "fs-extra";
import path from "path";
import TurndownService from "turndown";

/**
 * @typedef {object} Place
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} gid
 * @property {string} name
 * @property {string} description
 * @property {string} slug
 * @property {string} filename
 */

const mdConverter = new TurndownService();

convertCsvToMd("scripts/data/bokštai.csv", "content");
convertCsvToMd("scripts/data/pastatai.csv", "content");
convertCsvToMd("scripts/data/pažintiniai-takai.csv", "content");
convertCsvToMd("scripts/data/pesčiūjų-takai.csv", "content");

/**
 * @param {string} csvFile
 * @param {string} targetFolder
 */
function convertCsvToMd(csvFile, targetFolder) {
  const file = fs.readFileSync(csvFile);

  /** @type {Place[]} */
  const data = parse(file, {
    skipEmptyLines: true,
    fromLine: 2,
  }).map(
    (
      /** @type {string[]} */
      [latitude, longitude, gid, name, description]
    ) => {
      /** @type {Place} */
      const place = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        gid,
        name,
        description: mdConverter.turndown(description),
        slug: normalize(name),
        filename: `${normalize(name)}.md`,
      };

      return place;
    }
  );

  const targetDir = `${targetFolder}/${normalize(
    path.basename(csvFile, ".csv")
  )}`;

  fs.ensureDirSync(targetDir);
  data.forEach((d) => {
    let md = ``;
    md += `---\n`;
    md += `latitude: ${d.latitude}\n`;
    md += `longitude: ${d.longitude}\n`;
    md += `gid: ${d.gid}\n`;
    md += `name: ${d.name}\n`;
    md += `slug: ${d.slug}\n`;
    md += `---\n`;
    md += `${d.description}\n`;

    fs.writeFileSync(`${targetDir}/${d.filename}`, md);
  });
}

/**
 * @param {string} name
 */
function normalize(name) {
  const result = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[()"“”,„]/g, "")
    .trim()
    .replace(/\s+/gu, " ")
    .replace(/\s/gu, "-");

  return result;
}
