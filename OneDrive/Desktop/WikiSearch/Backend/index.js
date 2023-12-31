const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());
const axios = require('axios');

//------To create http request------------
app.get('/',async (req, res) => {
	let { search } = req?.query;
	const response =await  axios.get(
		`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`
	);
	res.send(response?.data?.query?.search);
});
app.listen(port, console.log(`server started at port ${port}`));