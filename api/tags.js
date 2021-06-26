const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
	console.log('A request is being made to /tags');

	next();
});

tagsRouter.get('/', async (req, res) => {
	const tags = await getAllTags();

	res.send({
		tags,
	});
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
	const { tagName } = req.params;
	try {
		const postUnfiltered = await getPostsByTagName(tagName);

		const postFiltered = postUnfiltered.filter((post) => {
			if (post.active) {
				return true;
			}
			if (req.user && post.author.id === req.user.id) {
				return true;
			}

			return false;
		})

		res.send({ postFiltered });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

module.exports = tagsRouter;
