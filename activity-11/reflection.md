## Key Learnings
(What were the most important concepts you learned?)

- The squares have an onClick handler that calls handleClick(), which then calls the onPlay() callback passed down from the parent. This chain of functions lets the click information go up through the component connections so the top game component can update the state and everything refreshes right.

- Creating with reusability in mind was satisfying. The square component was used (9 times) without having to copy code. This also meant if I update the square component I will only have to update one piece of code to affect the rest of the areas. Thinking about this on a larger scale means every button will keep consistency on complex projects, especially if someone other than myself were to use the component (It would guarantee consistency). Having one button component instead of many means that it would be easier to debug because there would only have to be one piece of code that could break instead of many.

- State management was implemented to keep track of gameHistory (remembers every board location made) and moveNumbers (which move i'm looking at at the moment.) useState hooks give a easy way to add state to functional react components by returning an array containing the current state value and a setter function that updates it.

- Instead of editing an array directly, creating a brand new copy and update it directly was done(immutability). React detects changes by looking if you've got a completely different array object. When .slice is used to make a copy and then update it, react refreshes. If you just modify the original array in place react will not refresh because its perceived as the same ... making a new array ensures react picks up on the change.

## Comparison
(How does the React version compare to your Activity 10 vanilla JS version?)

- React version takes away repetitive DOM and event handling code but the vanilla JS version shows better software design.

- vanilla version is a bit more code. this is because the react version doesn't have stat tracking and localStorage.

- In vanilla JS, it was harder to keep state and DOM in sync manually, had to select every element with document.querySelector

- In the vanilla JavaScript separate variables were used to track the game state. updating the board meant calling  saveGameState and updateBoard manually each move

- The JSX automatically updates the DOM when state changes so I don't have to manually manipulate elements

- Event handling is cleaner with onClick = {function() { handleClick(0); }} then manually attaching addEventListener to each element in vanilla JS


## Challenges
(What concepts were most difficult to understand?)

The JSX syntax was difficult only because it was all new. embed expressions were kindof confusing at first but actually are preferred vs the vanilla way.

The movement of props was strange to understand because of the downward only movement from parent to child. To pass information back to the parent a callback function would have to be used as a prop which is hard to wrap my head around... when a square is clicked it's calling onSquareClick which calls handleClick (in the board, which then calls onPlay in the game component.)

## Next Steps
(What React concepts do you want to learn more about?)

Making another project using something made in the past in this class with react would give me a good foundation to continue learning how to do implementation best. Already being familair with the project logic would make my focus on react rather than figuring out how the project works together.

I also am interested in creating more in depth components that could use more complex state management and logic. Maybe creating a component that displays data while also filtering that data for instance. Getting better at breaking components down and focusing on being more scalable sounds interesting to me.