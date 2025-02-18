function activate() {
	document.head.insertAdjacentHTML("beforeend", `
		<style>
			.time-picker {
				position: absolute;
				display: inline-block;
				padding: 10px;
				background: #eeeeee;
				border-radius: 6px;
			}

			.time-picker__select {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				outline: none;
				text-align: center;
				border: 1px solid #dddddd;
				border-radius: 6px;
				padding: 6px 10px;
				background: #ffffff;
				cursor: pointer;
				font-family: 'Heebo', sans-serif;
			}

			.time-picker__format {
				margin-top: 10px;
			}
		</style>
	`);

	document.querySelectorAll(".custom-time-picker").forEach(timePickable => {
		let activePicker = null;

		timePickable.addEventListener("focus", () => {
			if (activePicker) return;

			activePicker = show(timePickable);

			const onClickAway = ({ target }) => {
				if (
					target === activePicker
					|| target === timePickable
					|| activePicker.contains(target)
				) {
					return;
				}

				document.removeEventListener("mousedown", onClickAway);
				document.body.removeChild(activePicker);
				activePicker = null;
			};

			document.addEventListener("mousedown", onClickAway);
		});
	});
}

function show(timePickable) {
	const picker = buildPicker(timePickable);
	const { bottom: top, left } = timePickable.getBoundingClientRect();

	picker.style.top = `${top}px`;
	picker.style.left = `${left}px`;

	document.body.appendChild(picker);

	return picker;
}
function buildPicker(timePickable) {
	const picker = document.createElement("div");
	const hourOptions12hr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
	const hourOptions24hr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(numberToOption);
	const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(numberToOption);

	picker.classList.add("time-picker");

	picker.innerHTML = `
		<select class="time-picker__select" id="hour-select">
			${hourOptions12hr.join("")}
		</select>
		:
		<select class="time-picker__select" id="minute-select">
			${minuteOptions.join("")}
		</select>
		<select class="time-picker__select" id="meridiem-select">
			<option value="am">am</option>
			<option value="pm">pm</option>
		</select>

		<div class="time-picker__format">
			<label><input type="radio" name="format" value="12hr" checked> 12 Hour</label>
			<label><input type="radio" name="format" value="24hr"> 24 Hour</label>
		</div>
	`;

	const selects = getSelectsFromPicker(picker);
	const formatRadios = picker.querySelectorAll('input[name="format"]');

	// Event listener for format change
	formatRadios.forEach(radio => {
		radio.addEventListener('change', (e) => {
			if (e.target.value === "12hr") {
				show12hrFormat(selects, true);
				show24hrFormat(selects, false);
				updateHourOptions(selects, "12hr"); // Update hour options to 12-hour format
			} else {
				show12hrFormat(selects, false);
				show24hrFormat(selects, true);
				updateHourOptions(selects, "24hr"); // Update hour options to 24-hour format
			}
		});
	});

	// Update hour dropdown based on initial value (if any)
	if (timePickable.value) {
		const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);

		if (parseInt(hour) > 12) {
			selects.hour.value = hour - 12; // Adjust to 12-hour format if in PM
			selects.meridiem.value = 'pm';
		} else {
			selects.hour.value = hour;
			selects.meridiem.value = 'am';
		}
		selects.minute.value = minute;
	}

	selects.hour.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
	selects.minute.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
	selects.meridiem.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));

	// Initialize with 12-hour format
	show12hrFormat(selects, true);
	show24hrFormat(selects, false);
	updateHourOptions(selects, "12hr"); // Initialize with 12-hour options

	return picker;
}

function updateHourOptions(selects, format) {
	const hourSelect = selects.hour;

	// Clear existing options
	hourSelect.innerHTML = '';

	// Set the options based on the format
	let hourOptions = [];
	if (format === "12hr") {
		hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
	} else {
		hourOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(numberToOption);
	}

	// Append the new options
	hourSelect.innerHTML = hourOptions.join("");
}

function show12hrFormat(selects, show) {
	selects.meridiem.style.display = show ? "inline-block" : "none";
}

function show24hrFormat(selects, show) {
	selects.meridiem.style.display = show ? "none" : "inline-block";
}

function getTimePartsFromPickable(timePickable) {
	const pattern = /^(\d+):(\d+) (am|pm)$/;
	const [hour, minute, meridiem] = Array.from(timePickable.value.match(pattern)).splice(1);

	return {
		hour,
		minute,
		meridiem
	};
}

function getSelectsFromPicker(timePicker) {
	const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select");

	return {
		hour,
		minute,
		meridiem
	};
}

function getTimeStringFromPicker(timePicker) {
	const selects = getSelectsFromPicker(timePicker);

	return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`;
}

function numberToOption(number) {
	const padded = number.toString().padStart(2, "0");

	return `<option value="${padded}">${padded}</option>`;
}

activate();
