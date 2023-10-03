// export async function handler(event) {
//     try {
//       const fs = require('fs');
//       const data = JSON.parse(fs.readFileSync('appurl.json', 'utf8'));
  
//       // Parse the incoming request body (assumes JSON)
//       const requestBody = JSON.parse(event.body);
  
//       // Update the JSON data
//       data.someKey = requestBody.newValue;
  
//       // Write the updated data back to the file
//       fs.writeFileSync('appurl.json', JSON.stringify(data));
  
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ message: 'JSON data updated successfully' }),
//       };
//     } catch (error) {
//       console.log("ashishji " + error)
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ message: 'Error updating JSON data', error : error }),
//       };
//     }
//   }
  

const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    // Use path.join to create a correct relative path
    const filePath = path.join(__dirname, '/appurl.json');

    
    // Parse the incoming request body (assumes JSON)
    const requestBody = JSON.parse(event.body);

    // Read the existing JSON file
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Append the new data to the JSON array
    data.push(requestBody);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'JSON data updated successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating JSON data' , error :  error}),
    };
  }
};

