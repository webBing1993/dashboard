// module.exports = {
//   NODE_ENV: '"production"'
// };
const target = process.env.npm_lifecycle_event;

if (target == 'prod') {
  console.log(111111111)
  var obj = {
    NODE_ENV: '"prod"'
  }
} else if (target == 'test') {
  var obj = {
    NODE_ENV: '"test"'
  }
} else if (target == 'stg') {
  console.log('sssssssssssssss')

  var obj = {
    NODE_ENV: '"stg"'
  }
} else if (target == 'intg') {
  var obj = {
    NODE_ENV: '"intg"'
  }
}else if(target == 'development'){
  console.log(444444444)

  var obj = {
    NODE_ENV: '"ssj_ai_ssj"'
  }
}
else {
  console.log(555555555555)

  var obj = {
    NODE_ENV: '"production"'
  }
}

module.exports = obj;
// console.log('target=====',obj)
