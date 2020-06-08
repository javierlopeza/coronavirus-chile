import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { formatValue } from '../utils/formatter';

const Row = (props) => {
  const history = useHistory();
  const { data, path } = props;
  const rowValues = _.toPairs(data).map(([header, value]) => {
    const key = `${data.comuna}_${header}_${value}`;
    const isNumber = _.isNumber(value);
    const formattedValue = isNumber ? formatValue(value) : value;
    return <Td key={key} isNumber={isNumber}>{formattedValue}</Td>;
  });
  return <Tr onClick={() => history.push(path)}>{rowValues}</Tr>;
};

const Table = (props) => {
  const { headers, rows } = props;
  const headerRow = (
    <Tr>
      {headers.map(header => (
        <Th key={header}>{header}</Th>
      ))}
    </Tr>
  );
  const dataRows = rows.map(({ data, path }) => (
    <Row
      key={data.comuna}
      data={data}
      path={path}
    />
  ));
  return (
    <Container>
      <THead>{headerRow}</THead>
      <TBody>{dataRows}</TBody>
    </Container>
  );
};

export default Table;

const Container = styled.table`
  background-color: white;
  border-radius: 10px;
  border-collapse: collapse;
  ${({ theme }) => theme.baseShadow}
`;

const THead = styled.thead``;

const TBody = styled.tbody`
  tr:hover {
    cursor: pointer;
    color: white;
    background-color: ${({ theme }) => theme.colors.blue.normal};
  }
`;

const Tr = styled.tr`
  :hover {
    td, & + tr > td {
      border-color: transparent;
    }
  }
`;

const Th = styled.th`
  padding: 1em 2em 1em 0;
  color: ${({ theme }) => theme.colors.blue.normal};
  font-weight: 400;
  text-align: center;
  line-height: 1.2em;
  max-width: 5em;

  :first-child {
    padding-left: 2em;
  }
`;

const Td = styled.td`
  padding: 0.5em 2em 0.5em 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  text-align: center;
  line-height: 1.2em;
  max-width: 10em;

  :first-child {
    padding-left: 2em;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  :last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
