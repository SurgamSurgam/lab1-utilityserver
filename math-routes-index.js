const express = require('express');
const app = express();
const port = 3000;

app.get('/math/:operator', (req,res) => {
  const query = req.query;
  let operator = req.params.operator;
  let arrQueryStringValues = Object.values(query);

  let arrQueryNumValues = arrQueryStringValues.map(el => {
    if (+el){
      return +el;
    } else {
      res.send('Numbers only please.')
    }
  });

  let operationString;
  if (operator !== 'divide') {
    operationString = arrQueryNumValues.join(` ${operator} `);
  } else if (operator === 'divide') {
    operationString = arrQueryNumValues.join(' / ');
  }

    switch (operator) {
      case '+': res.json({input: query, operationString: operationString, result: arrQueryNumValues.reduce((acc,el) => acc + el)});
        break;

      case '-': res.json({input: query, operationString: operationString, result: arrQueryNumValues.reduce((acc,el) => acc - el)});
        break;

      case '*': res.json({input: query, operationString: operationString, result: arrQueryNumValues.reduce((acc,el) => acc * el)});
        break;

      case 'divide': res.json({input: query, operationString: operationString, result: arrQueryNumValues.reduce((acc,el) => acc / el)});
        break;
      default: res.send('the operator is not supported. Only +, -, divide, * ')
    }

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
