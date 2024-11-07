import { Selector } from "testcafe";

fixture("Todo tasks tests")   
    .page("test.sustainabilityproject.one/todo/") //test.sustainabilityproject.one/todo/

 //1.i want to test if the todo task will appear once its added
test("visible todo", async t=> {

    await t
    //arrange
    .typeText(Selector("#todo-input"), "get groceries")
    //act
    .click(Selector("#submit"))
    //assert
    .expect(Selector(".todo-item").withText("get groceries").exists).ok();

});

 //2. i want to test if the todo task will turn green when i check mark it as done

 test("completed task", async t=> {

await t
    //arrange
    .typeText(Selector("#todo-input"), "get groceries")
    .click(Selector("#submit"))
    //act
    await t.click(Selector("#checkbox"))
    //assert
    .expect(Selector(".todo-item").withText("get groceries").getStyleProperty("background-color")).eql("rgb(209, 173, 145)"); 

    
});

//I tested if the date displays correctly once the task is added

test("display due date for todo", async t => {
    const dueDate = "2024-11-10"; // Example date

    await t
        .typeText(Selector("#todo-input"), "get groceries")
        .typeText(Selector("#todo-due-date"), dueDate)
        .click(Selector("#submit"))
        .expect(Selector(".todo-item").withText("get groceries")
            .find(".due-date").textContent).contains("Due: 2024-11-10");
});

// I tested if the time displays correctly once the task is added
test("display due time for todo", async t => {
    const dueTime = "14:30"; // Example time

    await t
        .typeText(Selector("#todo-input"), "get groceries")
        .typeText(Selector("#todo-due-time"), dueTime)
        .click(Selector("#submit"))
        .expect(Selector(".todo-item").withText("get groceries")
            .find(".due-time").textContent).contains("Time: 14:30");
});

