package com.myexampletodo.rest.webservices.restfulwebservices.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TodoController {
    @Autowired
//    private TodoService todoService;
    private TodoRepository todoRepository;
    @GetMapping("/users/{username}/todos")
    public List<Todo> getTodos(@PathVariable String username){
//        return todoService.findByUsername(username);
        return todoRepository.findByUsername(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Optional<Todo> getTodo(@PathVariable String username,
                                  @PathVariable int id ){
//        return todoService.findById(id);
        return todoRepository.findById(id);
    }
    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodos(@PathVariable String username,
                                            @PathVariable int id ){
//        todoService.deleteById(id);
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/users/{username}/todos/{id}")
    public Todo updateTodos(@PathVariable String username,
                            @PathVariable int id,
                            @RequestBody Todo todo ){
//        todoService.updateTodo(todo);
        todoRepository.save(todo);
        return todo;
    }
    @PostMapping("/users/{username}/todos")
    public Todo createTodos(@PathVariable String username,
                            @RequestBody Todo todo ){
        todo.setUsername(username);
        todo.setId(null); // that is why we set id as null
        return todoRepository.save(todo);
//        Todo createdTodo =  todoService.addTodo(username,
//                todo.getDescription(),
//                todo.getTargetDate(),
//                todo.isDone());
//        return createdTodo;
    }
}