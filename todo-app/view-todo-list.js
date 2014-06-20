/*global app */
app.usecase.viewTodoList = {
	create: function (view,
					   getTodoList,
					   saveTodoList,
					   todoListItemCreator,
					   addTodoListItemCreator,
					   completeTodoListItemCreator) {
		'use strict';
		var viewTodoList = Object.create(app.usecase.usecaseBase.create()),
			addTodoListItem,
			completeTodoListItem;
		
		function render() {
			view.render();
			view.initEventHandlers();
		}
		
		function addTodoListItemEventHandler(e) {
			var item = todoListItemCreator.create({ text: e.text });
			addTodoListItem.execute(item);
			render();
		}
		
		function completeTodoListItemEventHandler(e) {
			completeTodoListItem.execute(e.index, e.isChecked);
			render();
		}
		
		function initEventHandlers() {
			viewTodoList.initEventHandler('addTodoListItem', addTodoListItemEventHandler);
			viewTodoList.initEventHandler('completeTodoListItem', completeTodoListItemEventHandler);
		}
		
		function initDependencies(todoList) {
			addTodoListItem = addTodoListItemCreator.create(todoList);
			completeTodoListItem = completeTodoListItemCreator.create(todoList);
		}
		
		function bindModelData(todoList) {
			view.getViewData().data.todoList = todoList.toArray();
		}
		
		viewTodoList.execute = function () {
			var todoList = getTodoList.execute();
			initDependencies(todoList);
			bindModelData(todoList);
			render();
			initEventHandlers();
		};
		
		return viewTodoList;
	}
};