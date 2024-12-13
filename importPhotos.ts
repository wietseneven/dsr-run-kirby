const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const photosDestDir = path.join(__dirname, 'data/storage/content/fotos/1_2024');
const photosSrcDir = "/Users/wietseneven/Library/CloudStorage/GoogleDrive-hello@wietseneven.com/.shortcut-targets-by-id/1HhluarJS13U5sO4JiWY818Cd3PiSRIwp/DinkelSurvivalRunners/9 Run/9.11 Foto's/2024/Vrijwilligers WhatsApp";

const files = fs.readdirSync(photosSrcDir);
for (const file of files) {
	if (!file.endsWith('.jpg') && !file.endsWith('.jpeg') && !file.endsWith('.JPG') && !file.endsWith('.JPEG')) continue;

	const extension = lodash.lowerCase(file.endsWith('.jpg')) ? '.jpg' : '.jpeg';
	const sanitizedName = lodash.kebabCase(file.replace('.jpg', '').replace('.jpeg', '').replace('.JPG', '').replace('.JPEG', '')) + extension;
  const srcFile = path.join(photosSrcDir, file);
  const destFile = path.join(photosDestDir, sanitizedName);

	const properties = file.split(/(Hindernis | Categorie | - )/);
	// console.log(properties);
	const creator = properties[0];
	const hindernisIndex = properties.findIndex(property => property.includes('Hindernis'));
	const categoriesIndex = properties.findIndex(property => property.includes('Categorie'));
	const hindernis = hindernisIndex > 0 ? properties[hindernisIndex + 1] : '';
	const categories = categoriesIndex > 0 ? properties[categoriesIndex].replace('Categorie ', '') : '';

	console.log({ creator, hindernis, categories });

	// console.log(sanitizedName);

	const markdown = `
Obstacles: ${hindernis}

----

Categories: ${categories}

----

Creator: ${creator}

----

Alt:

----

Template: gallery-image
`;

  fs.copyFileSync(srcFile, destFile);
	fs.writeFileSync(destFile + '.nl.txt', markdown);
	console.log(`Copied ${file} to ${destFile}`);
}

// console.log(files);
