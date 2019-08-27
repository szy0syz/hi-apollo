# React & GraphQL SpaceX Web

## 概要

### 初始安装

```bash
npm i express graphql express-graphql axios -S

npm i --save-dev nodemon
```

### npm并行执行命令

```bash
npm i concurrently -D

## package.json
## "dev": "concurrently \"npm run server\" \"npm run client\""
## 同时运行两个命令
```

### Bootswatch

> Bootstrap 风格样式文件

* `https://bootswatch.com/`

### apollo

```bash
npm i apollo-boost react-apollo graphql
```

### GraphQL + Apollo

> 符合 apollo 的玩法

* 最顶层容器组件添加适配器Provider

```jsx
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt="logo"></img>
          <Route exact  path="/" component={Launches} />
          <Route exact  path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}
```

* 组件中使用graphql

```jsx
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`

<Query query={LAUNCHES_QUERY}>
  {({ loading, error, data }) => {
  if (loading) return <h4>Loading...</h4>;
  if (error) console.log(error);
  return <Fragment>
    {
      data.launches.map(launch => {
        return <LaunchItem key={launch.flight_number} launch={launch}/>
      })
    }
    </Fragment>
  }}
</Query>
```

* 参数查询

```jsx
const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

<Query query={LAUNCH_QUERY} variables={{ flight_number }}>
  {({ loading, error, data }) => {
    if (loading) return <h4>loading...</h4>;
    if (error) console.log(error);

    const {
      flight_number,
      mission_name,
      launch_year,
      launch_success,
      rocket: { rocket_id, rocket_name, rocket_type },
    } = data.launch;

    return (
      <div>
        <h1 className="display-4 my-3">
          <span className="text-dark">Mission: </span> {mission_name}
        </h1>
        <div className="mb-3">
          Launch Details
        </div>
        <ul className="list-group">
          <li className="list-group-item">Flight Number: { flight_number }</li>
          <li className="list-group-item">Flight Year: { launch_year } </li>
          <li className="list-group-item">Flight Successful: { launch_success }</li>
        </ul>
      </div>
    )
  }}
</Query>
```

### react-moment

```jsx
<Moment format="YYYY-MM-DD HH:mm">{ launch_date_local }</Moment>
```