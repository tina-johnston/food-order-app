import { useEffect, useState } from 'react';
import Meal from './Meal';
import Card from '../../UI/Card';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      // setIsLoading(true);
      const response = await fetch(
        'https://order-13802-default-rtdb.europe-west1.firebasedatabase.app/order.json'
      );
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  // add a load ing spinner component

  if (isLoading) {
    return (
      <section>
        <p>loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <Meal
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
