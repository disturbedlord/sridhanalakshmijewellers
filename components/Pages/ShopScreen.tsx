import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { memo, useCallback, useEffect, useState } from "react";
import { GetAllProducts } from "../../services/ShopService";
import { getAccessToken } from "../../context/AuthContext";
import { AppText, BackendAPI, PriceView, Spinner } from "../common";

export default function ShopScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [productLoading, setProductLoading] = useState(false);
  const accessToken = getAccessToken();
  const [filters, setFilters] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const Index = async () => {
    setLoading(true);
    const result = await GetAllProducts(accessToken);
    // console.log("RESULT : ", result);
    if (result?.response?.categories) {
      result.response.categories.unshift();
      setFilters(result.response.categories);
    }
    if (result?.response?.products) {
      setAllProducts(result.response.products);
      setFilteredProducts(result.response.products);
    }

    setLoading(false);
  };

  useEffect(() => {
    Index();
  }, []);

  const handleFilterChange = useCallback(
    (name: string) => {
      const prevFilter = activeFilter;
      setProductLoading(true);
      console.log(prevFilter, name);
      let productsFiltered = [];
      if (name === prevFilter) {
        setFilteredProducts(allproducts);
        setActiveFilter("All");
      } else {
        // console.log("LENGTH : ", allproducts.length);
        allproducts.forEach((item) => {
          // console.log(item.name);
          if (item.category === name) productsFiltered.push(item);
        });
        setActiveFilter(name);

        setFilteredProducts(productsFiltered);
      }
      setProductLoading(false);
    },
    [allproducts, productLoading, activeFilter],
  );

  return (
    <View className="flex-1 p-2 bg-neutral-100">
      <View>
        {/* Filters */}
        <AppText className="text-sm px-4 font-poppins-bold">Category</AppText>
        <FiltersComponent
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
        />
      </View>
      {/* Product Grid */}

      {productLoading ? (
        <Spinner />
      ) : (
        <View>
          <AppText className="text-sm px-4 font-poppins-bold text-[#80808080]">
            {filteredProducts?.length} items
          </AppText>

          <FlatList
            data={filteredProducts}
            numColumns={2}
            keyExtractor={(item) => item.sku}
            contentContainerStyle={{ padding: 10 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductScreen", { product: item })
                }
                className="bg-white rounded-xl mb-5 w-[48%] overflow-hidden"
              >
                <Image
                  source={{ uri: `${BackendAPI}${item.image}` }}
                  className="h-40 w-full rounded-xl"
                />

                <View className="p-3">
                  <AppText className="text-sm text-gray-500">
                    {item.name}
                  </AppText>
                  <PriceView
                    price={parseFloat(item.price)}
                    className={"text-yellow-600 font-semibold mt-1"}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const FiltersComponent = memo(
  ({
    filters,
    activeFilter,
    setActiveFilter,
  }: {
    filters: any;
    activeFilter: string;
    setActiveFilter: any;
  }) => {
    // console.log(filters);
    return (
      <FlatList
        className="   px-4 pb-2 pt-2"
        horizontal
        data={filters}
        contentContainerStyle={{ paddingRight: 16 }} // <-- important
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => setActiveFilter(item.name)}
            className={`mr-3  flex flex-col items-center`}
          >
            <Image
              source={{ uri: `${BackendAPI}${item.image}` }}
              className="h-20 w-20  rounded-xl"
            />
            <AppText
              className={`${
                activeFilter === item.name
                  ? "text-yellow-500 text-xs"
                  : "text-neutral-700 text-xs"
              }`}
            >
              {item.name}
            </AppText>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    );
  },
);
