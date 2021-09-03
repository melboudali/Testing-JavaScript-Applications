let count = 0;

const incrementCount = () => {
	count++;
	window.document.getElementById("count").innerHTML = count;
};

const incrementButton = window.document.getElementById("increment-button");
incrementButton.addEventListener("click", incrementCount);

module.exports = { count, incrementCount };
