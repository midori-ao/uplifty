var db = [
	{depressed: 'im so depressed, cheer me up :('},
	{angry: 'im so angry, RAWR'},
	{confused: 'i dont even'}
];

exports.getEmotion = function (req,res) {
 // var id = req.params.id;
 if (db) res.send(db);
 else res.send(404);
}