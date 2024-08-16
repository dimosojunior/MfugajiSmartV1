const Carousel = ({ images }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (flatlistRef.current && images.length > 0) {
      const interval = setInterval(() => {
        if (flatlistRef.current) {
          const newIndex = (activeIndex + 1) % images.length;
          flatlistRef.current.scrollToIndex({
            index: newIndex,
            animated: true,
          });
          setActiveIndex(newIndex);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [activeIndex, images.length]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const Slide = ({ item }) => (
    <View>
      <TouchableOpacity activeOpacity={1}>
        <Image
          source={{ uri: `${EndPoint}/${item}` }}
          style={{
            height: height / 4 + 10,
            width: screenWidth,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => (
    images.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? 'green' : 'red',
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ))
  );

  return (
    <View>
      <FlatList
        data={images}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={Slide}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
      />
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15, marginBottom: 15 }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};
