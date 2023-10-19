import express from "express";

const app = express();
const port = 3000;

let tasks = [];
let workTasks = [];

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const day = new Date().getDate();
const month = new Date().getMonth();
let date = "";

function currentDate() { 
    let monthAsString = "";

    switch (month) {
        case 0:
            monthAsString = "January";
            break;
        case 1:
            monthAsString = "February";
            break;
        case 2:
            monthAsString = "March";
            break;
        case 3:
            monthAsString = "April";
            break;
        case 4:
            monthAsString = "May";
            break;
        case 5:
            monthAsString = "June";
            break;
        case 6:
            monthAsString = "July";
            break;
        case 7:
            monthAsString = "August";
            break;
        case 8:
            monthAsString = "September";
            break;
        case 9:
            monthAsString = "October";
            break;
        case 10:
            monthAsString = "November";
            break;
        case 11:
            monthAsString = "December";
            break;
        default:
            console.log("Error");
    };
    date = monthAsString + ", " + day;
};

app.get("/", (req, res) => {
    currentDate();
    const personalTasks = tasks.filter(task => !task.work);
    res.render("index.ejs", { date: date, personalTaskList: personalTasks });
});

app.get("/work", (req, res) => {
    currentDate();
    const workRelatedTasks = tasks.filter(task => task.work);
    res.render("work.ejs", { date: date, workTaskList: workRelatedTasks });
});

app.post("/submit", (req, res) => {
    let isWork = req.body["taskType"] === "work";

    let newTask = {
        name: req.body["task"],
        completed: false,
        work: isWork
    };

    tasks.push(newTask);

    if (isWork === true) {
        res.redirect("/work");
    } else {
        res.redirect("/");
    };
});

app.listen(port, () => {
    console.log(`Server is live at port: ${port}`);
});