import { useEffect, useState } from "react";

import { Text , View ,FlatList } from 'react-native'

const Test = () => {

    const [data , setData]  = useState ([])

    useEffect(() => {
       getApi ()
      },[]);

      const getApi = async () => {
        try {
            let fetchApi = await fetch("https://pokeapi.co/api/v2/pokemon/")
            let response =  await fetchApi.json()
            setData(response.results)
        } catch {

        }
      }

      const renderItem = ({item, index}) => {
          return (
            <View>
                <Text>{item.name}</Text>
                <Text>{item.url}</Text>
            </View>
          )
      }


    return (
        <View>

            <FlatList 
            data={data}
            renderItem={renderItem}
            />

        </View>
    )

}


export default Test 