import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { TarjetaEstadistica } from '../dashboard/card-stat';
import { TarjetaPlato } from '../dashboard/card-dinner';
import { TarjetaPersonal } from '../dashboard/card-operator';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { datosVentas, personal, recommendedDishes, stats } from '@/lib/dashboard';

export default function PanelRestaurante() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const isMobile = widthPercentageToDP('100%') < 1024;

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;

    if (!isManualScrolling) {
      scrollInterval = setInterval(() => {
        if (scrollViewRef.current) {
          const nextIndex = (currentIndex + 1) % stats.length;
          setCurrentIndex(nextIndex);
          scrollViewRef.current.scrollTo({
            x: nextIndex * 345,
            animated: true
          });
        }
      }, 2000);
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [currentIndex, isManualScrolling]);

  const handleScrollBegin = () => {
    setIsManualScrolling(true);
  };

  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / 345);
    setCurrentIndex(index);
    setIsManualScrolling(false);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Panel de administración</Text>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gridEstadisticas}
        scrollEventThrottle={16}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        decelerationRate="fast"
        snapToInterval={345}
        snapToAlignment="start"
      >
        {stats.map((stat) => (
          <View key={stat.id} style={{ width: 285, }}>
            <TarjetaEstadistica
              titulo={stat.title}
              valor={stat.value}
              cambio={stat.change}
              icono={stat.icon}
            />
          </View>
        ))}
      </ScrollView>

      <View style={{ flex: 1, flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={{ flex: 1 }}>

          <Text style={styles.tituloSeccion}>Ventas Semanales</Text>
          <View style={styles.contenedorGrafica}>
            <BarChart
              noOfSections={5}
              barBorderRadius={4}
              frontColor="#0f065a"
              gradientColor="#6366F1"
              yAxisTextStyle={{ color: '#0f065a' }}
              data={datosVentas}
              spacing={38}
              rulesColor="lightgray"
              rulesType="solid"
              initialSpacing={10}
              yAxisColor="lightgray"
              xAxisColor="lightgray"
            />
          </View>
        </View>

        <View style={[styles.seccion, { flex: 1 }]}>
          <Text style={styles.tituloSeccion}>Platos Más Vendidos</Text>
          {!isMobile ? (
            <View style={styles.platosWrapper}>
              <ScrollView 
                style={styles.platosScroll}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ paddingVertical: 10 }}
              >
                {recommendedDishes.map((dish) => (
                  <View key={dish.id} style={styles.platoItem}>
                    <TarjetaPlato item={dish} />
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <FlatList
              data={recommendedDishes}
              renderItem={TarjetaPlato}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.flatListContent}
              scrollEnabled={false}
            />
          )}
        </View>
      </View>

      <Text style={styles.tituloSeccion}>Rendimiento del Personal</Text>

      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <View style={[styles.seccion, { backgroundColor: 'white', borderRadius: 12, padding: 10, marginBottom: 24 }]}>
          {personal.map(empleado => (
            <TarjetaPersonal key={empleado.nombre} empleado={empleado} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  gridEstadisticas: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  contenedorGrafica: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  seccion: {
    marginBottom: 24,

  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  flatListContent: {
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  platosContainer: {
    maxHeight: 260,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  platosWrapper: {
    height: heightPercentageToDP(35),
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  platosScroll: {
    flex: 1,
  },
  platoItem: {
    marginBottom: 8,
  },
}); 