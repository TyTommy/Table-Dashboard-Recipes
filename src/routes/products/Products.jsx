import React, { useCallback, useEffect, useState } from "react";
import request from "../../api/axios";
import { Button, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add_to_recipes } from "../../redux/actions";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 50,
    },
  });

  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.data.recipes);

  const checkRecipe = useCallback((value) => {
    const isValue = recipes.filter((item) => item.id === value.id).length;

    return isValue;
  });

  useEffect(() => {
    try {
      setLoading(true);
      request
        .get("/recipes")
        .then((response) => {
          setProducts(response.data.recipes);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (item) => (
        <img
          style={{ borderRadius: "50%" }}
          height={50}
          width={50}
          src={item}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      render: (row) => (
        <>
          {!checkRecipe(row) && (
            <Button
              type="primary"
              onClick={() => {
                dispatch(add_to_recipes(row));
              }}
            >
              Add to Recipes
            </Button>
          )}
        </>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleChange = (value) => {
    setTableParams({
      pagination: {
        ...tableParams,
        ...tableParams.pagination,
        pageSize: value,
      },
    });
  };

  return (
    <div>
      {" "}
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={products}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
        <Select
          defaultValue="2"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "2",
              label: "2",
            },
            {
              value: "3",
              label: "3",
            },
            {
              value: "5",
              label: "5",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Products;
