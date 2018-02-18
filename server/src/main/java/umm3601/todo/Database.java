package umm3601.todo;

import com.google.gson.Gson;
import umm3601.todo.Todo;

import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

/**
 * A fake "database" of todo info
 *
 * Since we don't want to complicate this lab with a real database,
 * we're going to instead just read a bunch of todo data from a
 * specified JSON file, and then provide various database-like
 * methods that allow the `TodoController` to "query" the "database".
 */
public class Database {

  private Todo[] allTodos;

  public Database(String todoDataFile) throws IOException {
    Gson gson = new Gson();
    FileReader reader = new FileReader(todoDataFile);
    allTodos = gson.fromJson(reader, Todo[].class);
  }

  /**
   * Get the single todo specified by the given ID. Return
   * `null` if there is no todo with that ID.
   *
   * @param id the ID of the desired todo
   * @return the todo with the given ID, or null if there is no todo
   * with that ID
   */
  public Todo getTodo(String id) {
    return Arrays.stream(allTodos).filter(x -> x._id.equals(id)).findFirst().orElse(null);
  }

  /**
   * Get an array of all the todos satisfying the queries in the params.
   *
   * @param queryParams map of required key-value pairs for the query
   * @return an array of all the todos matching the given criteria
   */
  public Todo[] listTodos(Map<String, String[]> queryParams) {
    Todo[] filteredTodos = allTodos;

    // Filter ID if defined
    if(queryParams.containsKey("_id")) {
      String targetId = queryParams.get("_id")[0];
      filteredTodos = filterTodosById(filteredTodos, targetId);
    }
    // Process other query parameters here...

    return filteredTodos;
  }

  /**
   * Get an array of all the todos having the target id.
   *
   * @param todos the list of todos to filter by age
   * @param targetId the target ID to look for
   * @return an array of all the todos from the given list that have
   * the target ID
   */
  public Todo[] filterTodosById(Todo[] todos, String targetId) {
    return Arrays.stream(todos).filter(x -> x._id.equals(targetId)).toArray(Todo[]::new);
  }

}
