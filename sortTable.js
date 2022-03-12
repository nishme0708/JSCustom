<!DOCTYPE html>
<html>
<body>

  <table id="table">
    <tr>
      <th>Name</th>
      <th>Surname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>John</td>
      <td>Smith</td>
      <td>10</td>
    </tr>
    <tr>
      <td>Pete</td>
      <td>Brown</td>
      <td>15</td>
    </tr>
    <tr>
      <td>Ann</td>
      <td>Lee</td>
      <td>5</td>
    </tr>
  </table>

  <script>
    // ... your code ...
    let rows = table.rows;
    rows = Array.from(rows).slice(1);
    
    rows =rows.sort((a,b)=>{
      console.log(a.cells[0],b.cells[0])
      return Number(a.cells[2].innerText) - Number(b.cells[2].innerText)
    }); 
    console.log(rows)
    table.tBodies[0].append(...rows);
  </script>

</body>
</html>
