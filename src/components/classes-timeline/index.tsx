import React from 'react';
import {FlatList, View} from 'react-native';
import {Colors} from '@config/styling';
import Text from '@components/common/Text';
import Icon from 'react-native-vector-icons/Ionicons';

interface IDotProps {
  size: any;
}

const Dot = (props: IDotProps) => {
  const size = props.size;
  const style = {
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: Colors.primary,
  };
  return <View style={style} />;
};

// @ts-ignore
const ClassesTimelineItem = ({isFirst, isLast, item, index}) => {
  const isActive = index === 1;
  const textColor = isActive ? '#FFFFFF' : Colors.darkText;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: isActive ? Colors.primary : 'white',
        borderRadius: 10,
      }}>
      <View
        style={{
          flex: 0,
          width: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: isActive ? '#FFFFFF' : Colors.primary,
            position: 'relative',
          }}>
          {!isFirst && (
            <View
              style={{
                height: 68,
                borderLeftWidth: 2,
                borderStyle: 'dashed',
                borderLeftColor: Colors.primary,
                opacity: 0.5,
                position: 'absolute',
                left: 3,
                top: 16,
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            opacity: isActive ? 0.8 : 0.6,
          }}>
          <Icon name={'time'} color={textColor} />
          <Text
            style={{marginRight: 10, marginLeft: 2, color: textColor}}
            numberOfLines={1}>
            16:30
          </Text>
          <Icon name={'people-circle'} color={textColor} />
          <Text
            style={{marginRight: 2, marginLeft: 2, color: textColor}}
            numberOfLines={1}>
            GCH190414
          </Text>
        </View>
        <Text
          type={'h4'}
          style={{marginTop: 4, color: textColor, lineHeight: 26}}
          numberOfLines={1}>
          Procedural Programming
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
    </View>
  );
};

const ClassesTimeline = () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <View
      style={{
        marginTop: 16,
        // flex: 1,
      }}>
      <FlatList
        data={data.reverse()}
        inverted
        renderItem={({item, index, separators}) => {
          return (
            <ClassesTimelineItem
              item={item}
              index={index}
              isFirst={index === 0}
              isLast={index === data.length - 1}
            />
          );
        }}
      />
    </View>
  );
};

export default ClassesTimeline;
