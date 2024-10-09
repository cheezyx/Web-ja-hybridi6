import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';

const App = () => {
  const [cocktail, setCocktail] = useState(null);

  // Fetch a random cocktail from the API
  const fetchRandomCocktail = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setCocktail(data.drinks[0]); 
    } catch (error) {
      console.error('Error fetching cocktail:', error);
    }
  };

  
  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  
  if (!cocktail) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Image
        source={{ uri: cocktail.strDrinkThumb }}
        style={styles.image}
      />
      <Text style={styles.subTitle}>Category: {cocktail.strCategory}</Text>
      <Text style={styles.subTitle}>Alcoholic: {cocktail.strAlcoholic}</Text>
      <Text style={styles.subTitle}>Glass: {cocktail.strGlass}</Text>

      <Text style={styles.instructionsTitle}>Instructions</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>

      <Text style={styles.ingredientsTitle}>Ingredients</Text>
      {Object.keys(cocktail)
        .filter((key) => key.startsWith('strIngredient') && cocktail[key])
        .map((key, index) => (
          <Text key={index} style={styles.ingredient}>
            {cocktail[key]} - {cocktail[`strMeasure${key.match(/\d+/)[0]}`] || 'To taste'}
          </Text>
        ))}
      
      <Button title="Get Another Cocktail" onPress={fetchRandomCocktail} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    marginVertical: 5,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  ingredient: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
