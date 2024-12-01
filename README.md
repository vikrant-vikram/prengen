# prengen
An AI engine
Algorithm for front-end behaviourAlgorithm shows how the front end handles the responses of the backend and how it communicates with the backend to provide the functionality. When a user visits a web app for the first time, the back-end sends the responseaccording to the request. Front end displays that page and sends the request to predict the next page. When the frontend gets the response then it checks if the user has made any other request, if the user hasn't made any more requestby the time then the. The front end preloads the predicted webpage and does not display it and after that, if the usermakes the same request then it sends a database change flag (to verify whether data changed after predictionresponse) if false then the preloaded page displays as it is otherwise displayed after changes in the data.If the user sends any other request other than the predicted request then the preloaded page gets discarded and aprediction error flag would be sent.StartStart sessionStore user session and user ip//store user session to give personalize experience to the userLoad homepagePredict next pageLoad predicted pageIf user visite next pagethenIf page_request == predicted_ page//to check whether predicted page is same as request page

thenCheck changes in database//checking the changes in the database after preddictionIf changedThenUpdate changed data to the front endDisplay the predicted pageSent successful prediction flagElseLoad the user requested pageSend current page code to serverSend previous page code to the serverEnd sessionEndAlgorithm for back-end behaviourThis algorithm shows how backend should behave to get functionality of predictive engine,When a user makes a request to the backend, the backend sends the requested page and saves the session details.Whenever a user visits any page a log gets created to understand users behaviour.When the front end makes the database check request, the back-end searches for changes within the period andsends the data and if the database didn’t change then it sends a false flag.StartRequestStore session and ipSend homepagePredict next pageSend predicted pageWait for responseIf user visite next pageIf database check flagIf changes in databaseSend database dataElseSend falseIf prediction success flagIncrement no of visit in predicted page by oneIf webpage requestDecrement the np of visit of predicted page by oneStore previous page and current page in the log tableRepeat previous all step until user end end the sessionEnd

Algorithm for probability priority:Since there are two tables for prediction. One table gives the prediction for a single user and another table specifiesprediction for all users. So this algorithm specifies which prediction should be used.StartPrediction requestCurr = current pageM1 = max(average_probability_table[curr])M2 = max( personal_probability_table[ip][curr])If ( M1>M2):Return M1ElseReturn M2EndFlow chartLogistic regression for prediction:An asset retrieval is called a function used in the context of a route, an entry function.Logistic activity, also called sigmoid activity, is performed by mathematicians to describe the human growthstructures in the environment, which are rapidly increasing and carrying the forces of nature. It is an S-shaped curvethat can take any number with real value and place it at values between 0 and 1, but not directly within those limits.Logistic regression is named for the function used at the core of the method, the logistic function.The logistic function, also called the sigmoid function, was developed by statisticians to describe properties ofpopulation growth in ecology, rising quickly and maxing out at the carrying capacity of the environment. It’s anS-shaped curve that can take any real-valued number and map it into a value between 0 and 1, but never exactly atthose limits.Alternatively, we assume that input (X) may belong to the default category (Y = 1), we can officially write this as:Note that probability estimates should be converted to binary values (0 or 1) in order to make probabilitypredictions. More on this later when we talk about making predictions.Logistic retrieval is a straightforward process, but the prediction is reversed using the login function. The effect ofthis is that we can no longer understand prediction as a combination of input as much as possible with the reversal ofthe line, for example, continuing from the top, the model can be described as:The above equation can also be written as:

This is helpful because we see that the output of the right output is also straightforward (like lineback), and the leftinput is the default text of the default category.The scale on the left is called the default category challenges (it is historically that we use the challenges, forexample, the challenges are used for horse racing rather than opportunities). Ratings are calculated as the average ofthe probability of an event divided by non-event opportunities, e.g. 0.8 / (1-0.8) with 4 chances so instead we canwrite:Because the issues are changed by logging in, we call this left-hand side log or probit. Other types of transformfunctions may be used (outside of scope_, but as a result, it is common to refer to a version that associates a variableline equation in possibilities such as link operation, e.g.We can take the exponent back to the right and label it as:Navigation:When the prediction table gets ready then the first question arises from where the probability should be taken eitherfrom average prediction table or the personalization prediction table. The answer to that question is whichever hasmore value. Suppose probability for page A from average tabel is P1 and probability for page B from personalizetable is P2 then if P1 is greater than P2 then prediction of P1 would be preferred and vise-versa.Given diagram shows navigation according to the prediction. According to this data following navigation wouldtake place1 -> 21 -> 33 -> 43 -> 3Since there can be multiple navigation from the current page then sum of both predictions would be preferred.Whichever path would have more weight that path would be taken. 

(PDF) Prengen : A Prediction System for Web Requests. Available from: https://www.researchgate.net/publication/352508231_Prengen_A_Prediction_System_for_Web_Requests [accessed Dec 01 2024].
