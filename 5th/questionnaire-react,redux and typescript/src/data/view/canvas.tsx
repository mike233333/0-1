import React, { Component } from 'react';

interface iCanvas {
    [name: string]: any
}

class Canvas extends Component<iCanvas> {
    constructor(props: iCanvas) {
        super(props);
    }
    drawLine(obj: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
        obj.beginPath();
        obj.moveTo(x, y);
        obj.lineTo(x2, y2);
        obj.strokeStyle = 'black';
        obj.stroke();
    }
    drawMarker(obj: CanvasRenderingContext2D, data: object|null) {
        if (!data) {
            obj.fillText('100%', 10, 50, 40);
            obj.fillText('75%', 10, 105, 40);
            obj.fillText('50%', 10, 160, 40);
            obj.fillText('25%', 10, 215, 40);
            obj.fillText('0', 20, 270, 40);
        } else {
            var len = Object.keys(data).length;
            var num = 500 / (+len + 1);
            var count = 1;
            for (let i in data) {
                obj.fillText(i, num * count + 50, 290, 50);
                count++;
            }
        }
    }
    drawRect(obj: CanvasRenderingContext2D, data: object|any, submitCount: number) {
        var len = Object.keys(data).length;
        var num = 500 / (+len + 1);
        var count = 1;
        for (let i in data) {
            obj.fillStyle = 'red';
            obj.fillRect(num * count + 25, 50 + 220 * (1 - data[i] / submitCount), 50, 220 * data[i] / submitCount);
            count++;
        }
    }
    render() {
        return (
            <canvas id={this.props.que.parId+'-'+this.props.que.order}></canvas>
        );
    }
    componentDidMount(){
        let canvas= document.getElementById(this.props.que.parId+'-'+this.props.que.order) as HTMLCanvasElement;
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = 600;
        canvas.height = 300;
        this.drawLine(ctx, 50, 50, 50, 270);
        this.drawLine(ctx, 50, 270, 550, 270);
        this.drawMarker(ctx, null);
        if (this.props.type === 'word') {
            let obj = {
                'answer': this.props.que.answer.length
            };
            this.drawMarker(ctx, obj);
            this.drawRect(ctx, obj, this.props.count);
        } else {
            let obj: { [name: number]: number } = {};
            this.props.opt.forEach((item: { index: number, [name: string]: any }) => {
                obj[item.index + 1] = item.count;
            });
            this.drawMarker(ctx, obj);
            this.drawRect(ctx, obj, this.props.count);
        }
    }
}

export default Canvas;