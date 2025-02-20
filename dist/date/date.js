function initializeFlatpickr(selector, mode, formatType, defaultStartDate = null, defaultEndDate = null) {
    let dateFormat, enableTime = false, noCalendar = false, time_24hr = true;

    switch (formatType) {
        case 'DDMMYYYY':
            dateFormat = "d-m-Y";
            break;
        case 'MMDDYYYY':
            dateFormat = "m-d-Y";
            break;
        case 'YYYYMMDD':
            dateFormat = "Y-m-d";
            break;
        case '12HR':
            dateFormat = "h:i K";
            enableTime = true;
            noCalendar = true;
            time_24hr = false;
            break;
        case '24HR':
            dateFormat = "H:i";
            enableTime = true;
            noCalendar = true;
            time_24hr = true;
            break;
        default:
            dateFormat = "d-m-Y";
    }

    let flatpickrOptions = {
        mode: mode,
        dateFormat: dateFormat,
        enableTime: enableTime,
        noCalendar: noCalendar,
        time_24hr: time_24hr
    };

    if (mode === "range") {
        flatpickrOptions.maxDate = new Date();
        flatpickrOptions.defaultDate = defaultStartDate && defaultEndDate ? [new Date(defaultStartDate), new Date(defaultEndDate)] : null;
    } else if (mode === "single") {
        flatpickrOptions.maxDate = new Date();
        flatpickrOptions.defaultDate = defaultStartDate ? new Date(defaultStartDate) : null;
    } else if (mode === "time") {
        flatpickrOptions.defaultDate = defaultStartDate ? defaultStartDate : null; 
    }

    flatpickrOptions.onChange = function (selectedDates, dateStr, instance) {
        if (mode === "range" && selectedDates.length > 1) {
            var dates = {
                'from': moment(selectedDates[0]).format('YYYY-MM-DD'),
                'to': moment(selectedDates[1]).format('YYYY-MM-DD')
            };

            console.log('Selected Range:', dates);
            $(instance.input).val(dateStr);
            $(instance.input).attr('valueString', JSON.stringify(dates));
        } else if (mode === "single" && selectedDates.length > 0) {
            var selectedDate = moment(selectedDates[0]).format('YYYY-MM-DD');

            console.log('Selected Date:', selectedDate);
            $(instance.input).val(dateStr);
            $(instance.input).attr('valueString', selectedDate);
        } else if (mode === "time" && selectedDates.length > 0) {
            var selectedTime = moment(selectedDates[0]).format(time_24hr ? 'HH:mm' : 'hh:mm A');

            console.log('Selected Time:', selectedTime);
            $(instance.input).val(selectedTime);
            $(instance.input).attr('valueString', selectedTime);
        }
    };

    flatpickr(selector, flatpickrOptions);
}

initializeFlatpickr(".flat_datepicker", "range", "DDMMYYYY", "2025-01-01", "2025-02-01");

initializeFlatpickr(".flat_datepicker_single", "single", "DDMMYYYY", "2025-02-19");

initializeFlatpickr(".flat_timepicker_12hr", "time", "12HR", "02:30 PM");

initializeFlatpickr(".flat_timepicker_24hr", "time", "24HR", "14:30");
