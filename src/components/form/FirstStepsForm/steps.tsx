'use client'

import CustomCalendar from 'components/calendar/CalendarPicker'

const steps: JSX.Element[][] = [
  [
    <input key="test3" name="test3" placeholder="Test 3" />,
    <input key="test5" name="test5" placeholder="Test 5" />,
    <input key="test8" name="test8" placeholder="Test 8" />,
  ],
  [<CustomCalendar value="hi" key="test56" />],

  [
    <textarea key="test4" name="test4" placeholder="Test 4" />,
    <input key="test6" name="test6" placeholder="Test 6" />,
    <textarea key="test9" name="test9" placeholder="Test 9" />,
  ],
]

export default steps
