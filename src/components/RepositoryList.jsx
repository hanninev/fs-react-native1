import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Button, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },  
  searchInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, setOrder, setOrderDirection, searchKeyword, setSearchKeyword }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <PaperProvider>
            <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchKeyword}
          placeholder="Search"
          onChangeText={(text) => setSearchKeyword(text)}
        />
      </View>
      <FlatList
        ListHeaderComponent={<OrderSelection setOrder={setOrder} setOrderDirection={setOrderDirection} />}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => {
            navigate("/" + item.id);
          }}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    </PaperProvider>
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: order,
      orderDirection: orderDirection,
      searchKeyword: debouncedSearchKeyword,
    },
  });

  if (error || loading) return null;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      setOrder={setOrder}
      setOrderDirection={setOrderDirection}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

const OrderSelection = ({ setOrder, setOrderDirection }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleSelect = (order, direction) => {
    setOrder(order);
    setOrderDirection(direction);
    closeMenu();
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Sort by</Button>}
      >
        <Menu.Item onPress={() => handleSelect('CREATED_AT', 'DESC')} title="Latest repositories" />
        <Menu.Item onPress={() => handleSelect('RATING_AVERAGE', 'DESC')} title="Highest rated repositories" />
        <Divider />
        <Menu.Item onPress={() => handleSelect('RATING_AVERAGE', 'ASC')} title="Lowest rated repositories" />
      </Menu>
    </View>
  );
};

export default RepositoryList;
export { RepositoryListContainer };
