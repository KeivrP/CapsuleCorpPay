import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import BottomModal, { BottomModalRef } from "@/components/BottomSheet";

interface MoreScreenProps { 
    modalRef: React.RefObject<BottomModalRef>;
}

const MoreScreen = ({ modalRef }: MoreScreenProps) => {
    const data = Array.from({ length: 8 });

    return (
        <BottomModal snapPoint={270} ref={modalRef}>
            <FlatList
                scrollEnabled={false}
                data={data}
                numColumns={4}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ item, index }) => (
                    <View
                        key={index}
                        style={{
                            width: 80,
                            height: 80,
                            marginHorizontal: 10,
                            borderRadius: 20,
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            elevation: 5,
                        }}
                    />
                )}
            />
        </BottomModal>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
        gap: 10,
    },
});

export default MoreScreen;