import { Selector } from "testcafe";

fixture("Todo tasks tests")   
    .page(".github/workflows/TeamWorkflow.yml")

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
    .expect(Selector(".todo-item").withText("get groceries").getStyleProperty("background-color")).eql("rgb(0, 128, 0)"); 

    
});