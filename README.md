# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Sub CreateRiddlePresentation()
    ' Create a variable to represent PowerPoint, a presentation, and a slide.
    Dim ppApp As Object
    Dim ppPres As Object
    Dim ppSlide As Object
    Dim slideIndex As Integer

    ' Create an instance of PowerPoint
    Set ppApp = CreateObject("PowerPoint.Application")
    ' Make PowerPoint Visible
    ppApp.Visible = True
    ' Add a new presentation
    Set ppPres = ppApp.Presentations.Add

    ' Array of riddles and their answers
    Dim riddles As Variant, answers As Variant
    riddles = Array("I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", _
                    "The more of this there is, the less you see. What is it?", _
                    "I’m light as a feather, yet the strongest person can’t hold me for five minutes. What am I?", _
                    "I can be cracked, made, told, and played. What am I?", _
                    "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", _
                    "What has keys but can’t open locks?", _
                    "What has to be broken before you can use it?", _
                    "I’m tall when I’m young, and I’m short when I’m old. What am I?", _
                    "What has an eye but can not see?", _
                    "What gets wetter as it dries?", _
                    "I fly without wings, I cry without eyes. What am I?", _
                    "What comes once in a minute, twice in a moment, but never in a thousand years?", _
                    "I shrink smaller every time I take a bath. What am I?", _
                    "You can catch me but cannot throw me. What am I?", _
                    "I am not alive, but I grow; I don't have lungs, but I need air; I don’t have a mouth, but water kills me. What am I?")
                    
    answers = Array("An echo", _
                    "Darkness", _
                    "Breath", _
                    "A joke", _
                    "A map", _
                    "A piano", _
                    "An egg", _
                    "A candle", _
                    "A needle", _
                    "A towel", _
                    "A cloud", _
                    "The letter 'M'", _
                    "A bar of soap", _
                    "A cold", _
                    "Fire")

    ' Create slides for each riddle and answer
    For i = 0 To UBound(riddles)
        ' Add a new slide for the Riddle
        Set ppSlide = ppPres.Slides.Add(i * 2 + 1, 1) ' 1 denotes ppLayoutText
        ppSlide.Shapes(1).TextFrame.TextRange.Text = "Riddle " & (i + 1)
        ppSlide.Shapes(2).TextFrame.TextRange.Text = riddles(i)

        ' Add a new slide for the Answer
        Set ppSlide = ppPres.Slides.Add(i * 2 + 2, 1) ' 1 denotes ppLayoutText
        ppSlide.Shapes(1).TextFrame.TextRange.Text = "Answer " & (i + 1)
        ppSlide.Shapes(2).TextFrame.TextRange.Text = answers(i)
    Next i

    ' Optionally, apply a consistent style or transitions
    For Each ppSlide In ppPres.Slides
        ppSlide.FollowMasterBackground = msoFalse
        ppSlide.Background.Fill.PresetTextured msoTextureParchment
    Next ppSlide
    
    ' Clean up
    Set ppSlide = Nothing
    Set ppPres = Nothing
    Set ppApp = Nothing
End Sub

