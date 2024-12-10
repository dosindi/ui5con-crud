import React from "react";
import { Title } from "@ui5/webcomponents-react";
import { PieChart,BarChart } from "@ui5/webcomponents-react-charts";

export default function Dashboard() {
  const data = [
    {
      category: "Meal",
      amount: 150,
    },
    {
      category: "Car",
      amount: 460,
    },
  ];

  return (
    <>
      <Title>Dashboard</Title>
      <PieChart
        dimension={{ accessor: "category" }}
        measure={{ accessor: "amount" }}
        dataset={data}
      />
	  <BarChart
		  dataset={[
			{
			  name: 'January',
			  sessions: 300,
			  users: 100,
			  volume: 756
			},
			{
			  name: 'February',
			  sessions: 330,
			  users: 230,
			  volume: 880
			},
			{
			  name: 'March',
			  sessions: 404,
			  users: 240,
			  volume: 700
			},
			{
			  name: 'April',
			  sessions: 80,
			  users: 280,
			  volume: 604
			},
			{
			  name: 'May',
			  sessions: 300,
			  users: 100,
			  volume: 756
			},
			{
			  name: 'June',
			  sessions: 330,
			  users: 230,
			  volume: 880
			},
			{
			  name: 'July',
			  sessions: 470,
			  users: 20,
			  volume: 450
			},
			{
			  name: 'August',
			  sessions: 180,
			  users: 220,
			  volume: 104
			},
			{
			  name: 'September',
			  sessions: 360,
			  users: 200,
			  volume: 1000
			},
			{
			  name: 'October',
			  sessions: 500,
			  users: 250,
			  volume: 200
			},
			{
			  name: 'November',
			  sessions: 404,
			  users: 240,
			  volume: 700
			},
			{
			  name: 'December',
			  sessions: 80,
			  users: 280,
			  volume: 604
			}
		  ]}
		  dimensions={[
			{
			  accessor: 'name'
			}
		  ]}
		  measures={[
			{
			  accessor: 'users',
			  formatter: function Ki(){},
			  label: 'Users',
			  opacity: 0.6
			},
			{
			  accessor: 'sessions',
			  formatter: function Ki(){},
			  hideDataLabel: true,
			  label: 'Active Sessions'
			},
			{
			  accessor: 'volume',
			  label: 'Vol.'
			}
		  ]}
		  onClick={function Ki(){}}
		  onDataPointClick={function Ki(){}}
		  onLegendClick={function Ki(){}}
		/>
		
    </>
  );
}
