<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.css">
</head>
<body>
    @props([
    'showSingleDatePicker' => false,
    'singleDatePickerTitle' => 'Select Date',
    'singleDatePickerInputClass' => 'flat_datepicker_single',
    'singleDatePickerInputId' => 'single_datepicker',
    'singleDatePickerPlaceholder' => 'Select Date',

    'show12HrTimePicker' => false,
    'time12HrPickerTitle' => 'Select Time (12H)',
    'time12HrPickerInputClass' => 'flat_timepicker_12hr',
    'time12HrPickerInputId' => 'timepicker_12hr',
    'time12HrPickerPlaceholder' => 'Select Time (12-hour)',
    
    'show24HrTimePicker' => false,
    'time24HrPickerTitle' => 'Select Time (24H)',
    'time24HrPickerInputClass' => 'flat_timepicker_24hr',
    'time24HrPickerInputId' => 'timepicker_24hr',
    'time24HrPickerPlaceholder' => 'Select Time (24-hour)',
    
    ])

    <input type="text" class="flat_datepicker" placeholder="Select date range">
    <input type="text" class="flat_datepicker_single" placeholder="Select a date">
    <input type="text" class="flat_timepicker_12hr" placeholder="Select time (12HR)">
    <input type="text" class="flat_timepicker_24hr" placeholder="Select time (24HR)">

</body>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.js"
        integrity="sha512-K/oyQtMXpxI4+K0W7H25UopjM8pzq0yrVdFdG21Fh5dBe91I40pDd9A4lzNlHPHBIP2cwZuoxaUSX0GJSObvGA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="{{asset('/date/date.js')}}"></script>

</html>