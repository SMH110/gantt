## Plot component

Potentially handles all space adjustment

## Group component

A group component represent a multi line/row activities
A group also can have a children rows of activities can be be collapsed/expanded those children can have their own children ...etc.

Every time renders, it pushed a new group object to the state that has

- id
- activities array (2D array ) the first array represent how many rows the group have and each row array is a list of activities ( start, end)
- children: a list of Group item.
- total height: this includes children height

this means each group should correspond to an y-axis row and each group children item should have corresponded representative in the y-axis.

The group component should create a single ID and passes it to the rows children component

## Row component

- These are individual rows which they have activities (start, end)
- Set a specific height or use default height
- The height should be calculated from users input when they render activities

The row component should also expose a function that can be passed start, end and height and returns required props to give users full control.
should also, determine what the correct index of the row and initialize the activities row list/array
each row should pass required information to

## Activity

### Props

- start
- end
- height
