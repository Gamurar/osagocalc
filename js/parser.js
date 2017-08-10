parser = new DOMParser();
tree = parser.parseFromString(text, "text/xml");
trs = tree.querySelectorAll("tr");
dict = {};
var subject = null, city = null, fact = 0, rows = 0;
for (let j = 0; j < trs.length; j++) {
	let tds = trs[j].querySelectorAll("td");
	if (subject === null || fact >= rows) {
		for (let i = 0; i < tds.length; i++) {
			if (i == 0) {
				rows = Number(tds[i].getAttribute("rowspan")) || 1;
				subject = tds[i].innerHTML;
				dict[subject] = {};
				fact = 0;
			}
			if (i == 1) {
				city = tds[i].innerHTML;
				dict[subject][city] = [];
			}
			if (i == 2 || i == 3) {
				dict[subject][city].push(Number(tds[i].innerHTML));
			}
		}
		fact++;
	}
	else {
		for (let i = 0; i < tds.length; i++) {
			if (i == 0) {
				city = tds[i].innerHTML;
				dict[subject][city] = [];
			}
			if (i == 1 || i == 2) {
				dict[subject][city].push(Number(tds[i].innerHTML));
			}
		}
		fact++;
	}
}
