import useQuiosco from '@/hooks/useQuiosco';
import Layout from '@/layout/Layout'
import { useCallback, useEffect } from 'react';
import { formatearDinero } from "@/helpers"

export default function Total() {

    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco();

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    }, [pedido, nombre]);

    useEffect(() => {
        
        comprobarPedido()
    }, [pedido, comprobarPedido])

    

    return (
        <Layout pagina='Resumen'>
        <h1 className='text-4xl font-black'>Total</h1>
        <p className='text-2xl my-10'>Confirmar tu Pedido</p>
        <form
            onSubmit={colocarOrden}
        >
            <div>
                <label htmlFor='nombre' className='block uppercase text-slate-800 font-bold text-xl'>Nombre</label>
                <input 
                    type="text" 
                    id='nombre'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)} 
                    className='bg-gray-400 w-full mt-3 lg:w-1/3 p-2 rounded' />
            </div>
            <div className='mt-10'>
                <p className='text-2xl'>Total a Pagar {''} <span className='font-bold'>
                    {formatearDinero(total)}</span></p>
            </div>
            <div className='mt-5'>
                <input  type="submit"
                        disabled={comprobarPedido()}
                        className={`${comprobarPedido() ? 'bg-indigo-200' : 'bg-indigo-600'} cursor-pointer w-full text-center lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`} value="Confirmar Pedido"/>
            </div>
        </form>
    </Layout>
    )
}