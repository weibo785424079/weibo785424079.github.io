import {FormBuilder} from '@tms/site-component'
import {Form, Input} from 'antd/es/index'

export default Form.create()(({form}) => {
    return (
        <Form layout="inline">
            <FormBuilder
                meta={[
                    {
                        key: 'name',
                        label: '用戶名',
                        widget: Input
                    },
                    {
                        key: 'pass',
                        label: '密码',
                        widget: Input
                    }
                ]}
                form={form}/>
        </Form>)
});